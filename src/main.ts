import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './interceptor/custom-exception/custom-exception.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import configuration from './configs/configuration';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // Loại bỏ các trường không có trong DTO
        forbidNonWhitelisted: true, // Báo lỗi nếu có trường không hợp lệ
        transform: true, // Tự động chuyển đổi payload thành instance của DTO
    }));
    const config = new DocumentBuilder()
        .setTitle('Note list example')
        .setDescription('The note list API description')
        .setVersion('1.0')
        .addTag('Note list')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/document/swagger', app, documentFactory);
    await app.listen(configuration().port ?? 3000);
}
bootstrap();
