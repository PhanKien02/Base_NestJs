import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/modules/user.module';
import configuration from '@/configs/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptor/custom-response/custom-response.interceptor';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => (
                {
                    type: 'mysql',
                    host: configuration().database.host,
                    port: configuration().database.port,
                    username: configuration().database.username,
                    password: configuration().database.password,
                    database: configuration().database.database,
                    entities: [__dirname + '/entity/*{.js,.ts}'],
                    synchronize: true,
                    autoLoadEntities: true
                }
            )
        }),
    ],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: TransformResponseInterceptor,
    },],
})
export class AppModule { constructor(private dataSource: DataSource) { } }
