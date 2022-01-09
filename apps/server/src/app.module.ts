import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from './environments/environment';
import { CallCostsModule } from './call-costs/call-costs.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      database: environment.database.name,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => {
        return {
          autoSchemaFile: true,
          context: ({ req }) => ({ ...req }),
          introspection: true,
        };
      },
    }),
    CallCostsModule,
    PlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
