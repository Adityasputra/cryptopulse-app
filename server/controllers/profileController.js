const { Profile } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    const [updated] = await Profile.update(
      { name, email, profilePicture },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedProfile = await Profile.findByPk(req.params.id);
      res.json(updatedProfile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profile.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "Profile deleted" });
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
