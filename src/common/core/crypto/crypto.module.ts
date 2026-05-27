import { Module } from '@nestjs/common';
import { CryptoInterface } from './crypto.interface.js';
import { CryptoRepository } from './crypto.repository.js';

@Module({
  providers: [{ provide: CryptoInterface, useClass: CryptoRepository }],
  exports: [CryptoInterface],
})
export class CryptoModule {}
