import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import { sendEmail } from '../config/email';
import { AuthRequest } from '../middleware/auth';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  } as jwt.SignOptions);
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, phone });

    const token = generateToken(String(user._id));

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(String(user._id));

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('token', '', { maxAge: 1 });
  res.json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Click here to reset: ${resetUrl}`);

    res.json({ success: true, message: 'Password reset email sent' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
