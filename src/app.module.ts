import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 또는 사용 중인 데이터베이스 유형
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'bullet',
      entities: [User],
      synchronize: true, // 개발 환경에서만 사용, 프로덕션에서는 false로 설정
    }),
    UsersModule,
    AuthModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}