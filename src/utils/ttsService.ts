import Tts from 'react-native-tts';

class TTSService {
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize TTS
      await Tts.getInitStatus();
      
      // Set default language to English
      await Tts.setDefaultLanguage('en-US');
      
      // Set speech rate (0.5 = slow, 1.0 = normal, 2.0 = fast)
      await Tts.setDefaultRate(0.6);
      
      // Set pitch (0.5 = low, 1.0 = normal, 2.0 = high)
      await Tts.setDefaultPitch(1.0);

      this.isInitialized = true;
      console.log('TTS Service initialized successfully');
    } catch (error) {
      console.error('TTS initialization failed:', error);
    }
  }

  async speak(text: string, language: string = 'en-US') {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Stop any current speech
      await Tts.stop();
      
      // Set language for this specific speech
      await Tts.setDefaultLanguage(language);
      
      // Speak the text
      await Tts.speak(text);
    } catch (error) {
      console.error('TTS speak failed:', error);
      // Fallback: show alert if TTS fails
      // Alert.alert('Phát âm', `Không thể phát âm: ${text}`);
    }
  }

  async stop() {
    try {
      await Tts.stop();
    } catch (error) {
      console.error('TTS stop failed:', error);
    }
  }

  async getAvailableVoices() {
    try {
      const voices = await Tts.voices();
      return voices.filter((voice: any) => voice.language.startsWith('en'));
    } catch (error) {
      console.error('Failed to get voices:', error);
      return [];
    }
  }

  // Speak English word
  async speakEnglish(word: string) {
    await this.speak(word, 'en-US');
  }

  // Speak Vietnamese word (if Vietnamese TTS is available)
  async speakVietnamese(word: string) {
    await this.speak(word, 'vi-VN');
  }
}

export const ttsService = new TTSService();
