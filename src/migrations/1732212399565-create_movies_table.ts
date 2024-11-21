import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1732212399565 implements MigrationInterface {
    name = 'CreateMoviesTable1732212399565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`tbl_movie\` (
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`overview\` longtext NULL,
                \`poster_path\` varchar(255) NULL,
                \`release_date\` date NULL,
                \`vote_average\` decimal(3, 1) NULL,
                \`vote_count\` int NULL,
                \`genre_ids\` text NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`tbl_movie\`
        `);
    }

}
