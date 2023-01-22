const express = require("express");

const { ctrlWrapper, auth, upload } = require("../../middlewares");

const { users: ctrl } = require("../../contlollers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
