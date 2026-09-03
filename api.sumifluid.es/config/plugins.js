const allowedMediaTypes = [
  "image/*",
  "video/*",
  "audio/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.*",
  "text/plain",
  "text/csv",
];

const deniedExecutableTypes = [
  "application/vnd.microsoft.portable-executable",
  "application/x-msdownload",
  "application/x-msdos-program",
  "application/x-executable",
  "application/x-dosexec",
  "application/x-sh",
  "text/x-shellscript",
  "application/x-mach-binary",
];

module.exports = () => ({
  "chat-stats": {
    enabled: true,
    resolve: "./src/plugins/chat-stats",
  },
  "users-permissions": {
    config: {
      jwtManagement: "refresh",
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: {
    config: {
      breakpoints: {
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 220,
      },
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes: deniedExecutableTypes,
      },
    },
  },
});
