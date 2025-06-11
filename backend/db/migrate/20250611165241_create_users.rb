class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :user_email
      t.string :user_password
      t.string :first_name
      t.string :last_name
      t.string :user_type
      t.string :user_location

      t.timestamps
    end
  end
end
