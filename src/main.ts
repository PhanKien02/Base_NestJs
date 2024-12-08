import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './interceptor/custom-exception/custom-exception.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    app.useGlobalFilters(new CustomExceptionFilter());
    const config = new DocumentBuilder()
        .setTitle('Note list example')
        .setDescription('The note list API description')
        .setVersion('1.0')
        .addTag('Note list')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/document/swagger', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
