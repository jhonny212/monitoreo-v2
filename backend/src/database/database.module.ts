import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';


ConfigModule.forRoot({
    envFilePath: [join(process.cwd(), 'src/.env')],
})

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return (
                    {
                        type: 'postgres',
                        port: Number(process.env.DB_PORT || "5432"),
                        username: process.env.DB_USER || "postgres",
                        host: process.env.DB_HOST || "localhost",
                        password: process.env.DB_PASS,
                        database: process.env.DB_DATABASE,
                        synchronize: true,
                        logging: false,
                        name: 'backendConnection',
                        autoLoadEntities: true,
                        entities: [Student],
                        migrations: [],
                    }
                )
            }
        }),
    ]
})
export class DatabaseModule {

}
