import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exeptions.filter';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: 'http://localhost:5173', // Замените на ваш фронтенд домен
    credentials: true, // Разрешить отправку куки
  });

  await app.listen(PORT, () => console.log(`Server started in port = ${PORT}`));
}
bootstrap();
