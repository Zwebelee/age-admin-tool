import { existsSync } from 'fs';
import { join } from 'path';

describe('Environment file check', () => {
    test('should find .env file one level above root', () => {
        const envFilePath = join(__dirname, '../..', '.env');
        const fileExists = existsSync(envFilePath);
        if (!fileExists) {
            console.warn(`Warning: .env file not found at ${envFilePath}`);
        }
        expect(fileExists).toBe(true);
    });
});