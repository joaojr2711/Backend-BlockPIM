exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('user').notNullable();
    table.string('password').notNullable();
    table.string('telephone').notNullable();
    table.string('permission').notNullable();
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('users');
};
