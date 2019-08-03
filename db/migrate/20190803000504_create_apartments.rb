class CreateApartments < ActiveRecord::Migration[5.2]
  def change
    create_table :apartments do |t|
      t.string :street
      t.string :city
      t.integer :user_id

      t.timestamps
    end
  end
end
