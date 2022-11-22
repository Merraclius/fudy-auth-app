import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigurationService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { ConfigurationModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HashModule } from './utils/hash/hash.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (cs: ConfigurationService) => {
        return {
          type: 'postgres',
          host: cs.get('db.host'),
          port: cs.get('db.port'),
          username: cs.get('db.user'),
          password: cs.get('db.password'),
          database: cs.get('db.name'),
          synchronize: true,
          logging: false,
          entities: [User],
        };
      },
      inject: [ConfigurationService],
    }),
    AuthModule,
    UsersModule,
    HashModule,
  ],
  providers: [AppService, ConfigurationService],
})
export class AppModule {}
