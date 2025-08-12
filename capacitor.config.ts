import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.collegecompanion.app',
  appName: 'College Companion',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
