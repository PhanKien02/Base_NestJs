import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import configuration from './configs/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptor/custom-response/custom-response.interceptor';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: configuration().database.host,
            port: configuration().database.port,
            username: configuration().database.username,
            password: configuration().database.password,
            database: configuration().database.database,
            entities: [__dirname + '/entity/*{.js,.ts}'],
            synchronize: true,
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: TransformResponseInterceptor,
    },],
})
export class AppModule { constructor(private dataSource: DataSource) { } }
