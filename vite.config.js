import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signIn: resolve(__dirname, 'src/pages/SignIn/sign-in.html'),
        signUp: resolve(__dirname, 'src/pages/SignUp/sign-up.html'),
        chats: resolve(__dirname, 'src/layout/Chats/chats.html'),
        profile: resolve(__dirname, 'src/layout/Profile/profile.html'),
        editProfile: resolve(__dirname, 'src/layout/EditProfile/edit-profile.html'),
        currentChat: resolve(__dirname, 'src/layout/CurrentChat/current-chat.html'),
        changePassword: resolve(__dirname, 'src/dialogs/ChangePasswordDialog/change-password-dialog.html'),
        deleteProfile: resolve(__dirname, 'src/dialogs/DeleteProfileDialog/delete-profile-dialog.html'),
        pageNotFound: resolve(__dirname, 'src/error-pages/PageNotFound/page-not-found.html'),
        serverError: resolve(__dirname, 'src/error-pages/ServerError/server-error.html'),
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
