import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { urlencoded, Request, Response } from 'express';
import helmet from 'helmet';
import * as httpContext from 'express-http-context';
import * as fs from 'fs';

export function initializeApp(app: INestApplication) {
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(helmet());
  app.use(httpContext.middleware);
  app.use((req: Request, res: Response, next: () => void) => {
    httpContext.set('timestamp', Date.now());
    next();
  });
  app.enableCors({ origin: '*', allowedHeaders: '*' });
  app.setGlobalPrefix('/api/carpark-info');
}

export function initializeSwagger(app: INestApplication) {
  const server = app.getHttpAdapter();
  const options = new DocumentBuilder()
    .setTitle('Carpark Info API')
    .setDescription('API specification for Carpark Info Service | [swagger.json](swagger.json)')
    .addBearerAuth({ in: 'header', name: 'access-token', type: 'apiKey' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  writeSwaggerJson(`${process.cwd()}`, document);

  server.get('/docs/swagger.json', (req, res) => {
    res.json(document);
  });
  SwaggerModule.setup('/docs/carpark-info', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      displayRequestDuration: true,
    },
  });
}

function writeSwaggerJson(path: string, document) {
  const swaggerFile = `${path}/swagger.json`;
  fs.writeFileSync(swaggerFile, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });
}
