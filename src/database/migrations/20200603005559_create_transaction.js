exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(table){
    table.increments();
    
    table.string('title').notNullable();
    table.text('date').notNullable();
    table.decimal('value').notNullable();
    
    table.string('id_user').notNullable();

    table.foreign('id_user').references('id').inTable('users');
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('transactions');
};