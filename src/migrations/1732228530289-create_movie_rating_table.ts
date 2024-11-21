import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieRatingTable1732228530289 implements MigrationInterface {
    name = 'CreateMovieRatingTable1732228530289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`tbl_movie_rating\` (
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`fk_movie_id\` int NOT NULL,
                \`client_id\` int NOT NULL,
                \`value\` decimal(3, 1) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`tbl_movie_rating\`
            ADD CONSTRAINT \`tbl_movie_rating_fk_movie_id_tbl_movie\` FOREIGN KEY (\`fk_movie_id\`) REFERENCES \`tbl_movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tbl_movie_rating\` DROP FOREIGN KEY \`tbl_movie_rating_fk_movie_id_tbl_movie\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tbl_movie_rating\`
        `);
    }

}
