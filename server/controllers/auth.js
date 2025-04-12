import User from '../models/User.js';

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ name, email, password, mobile, role });
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    res.status(200).json({ msg: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching profile', error: err.message });
  }
};
