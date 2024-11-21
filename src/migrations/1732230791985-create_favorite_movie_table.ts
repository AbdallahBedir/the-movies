import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFavoriteMovieTable1732230791985 implements MigrationInterface {
    name = 'CreateFavoriteMovieTable1732230791985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`tbl_favorite_movie\` (
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`fk_movie_id\` int NOT NULL,
                \`client_id\` int NOT NULL,
                UNIQUE INDEX \`tbl_favorite_movie_client_movie_unique_index\` (\`fk_movie_id\`, \`client_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`tbl_favorite_movie\`
            ADD CONSTRAINT \`tbl_favorite_movie_fk_movie_id_tbl_movie\` FOREIGN KEY (\`fk_movie_id\`) REFERENCES \`tbl_movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tbl_favorite_movie\` DROP FOREIGN KEY \`tbl_favorite_movie_fk_movie_id_tbl_movie\`
        `);
        await queryRunner.query(`
            DROP INDEX \`tbl_favorite_movie_client_movie_unique_index\` ON \`tbl_favorite_movie\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tbl_favorite_movie\`
        `);
    }

}
