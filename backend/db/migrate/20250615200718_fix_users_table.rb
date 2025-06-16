class FixUsersTable < ActiveRecord::Migration[7.2]
  def change
    rename_column :users, :user_email, :email
    rename_column :users, :user_location, :location
    remove_column :users, :user_password, :string
    add_column :users, :password_digest, :string
  end
end
