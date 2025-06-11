# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Users
u1 = User.create!(user_email: "alice@example.com", user_password: "password1", first_name: "Alice", last_name: "Johnson", user_location: "Toronto")
u2 = User.create!(user_email: "bob@example.com", user_password: "password2", first_name: "Bob", last_name: "Smith", user_location: "Vancouver")
u3 = User.create!(user_email: "carol@example.com", user_password: "password3", first_name: "Carol", last_name: "Lee", user_location: "Montreal")
u4 = User.create!(user_email: "dave@example.com", user_password: "password4", first_name: "Dave", last_name: "Brown", user_location: "Calgary")
u5 = User.create!(user_email: "eve@example.com", user_password: "password5", first_name: "Eve", last_name: "Davis", user_location: "Ottawa")

# Categories
c1 = Category.create!(name: "Electronics")
c2 = Category.create!(name: "Automobiles")
c3 = Category.create!(name: "Clothing")
c4 = Category.create!(name: "Home & Garden")
c5 = Category.create!(name: "Toys")

# Products
Product.create!(name: "Wireless Mouse", description: "Ergonomic wireless mouse", image: "https://webobjects2.cdw.com/is/image/CDW/6842922?$product-main$", price_in_cents: 2500, quantity: 10, swappable: false, category_id: c1.id, user_id: u1.id)
Product.create!(name: "2015 Toyota Camry", description: "A reliable mid-size sedan with excellent fuel economy, comfortable interior, and smooth ride. Well-maintained with low mileage.",image: "https://mkt-vehicleimages-prd.autotradercdn.ca/photos/chrome/Expanded/White/2015TOY003a/2015TOY003a01.jpg", price_in_cents: 1800000, quantity: 1, swappable: false, category_id: c2.id, user_id: u2.id)
Product.create!(name: "Men's Jacket", description: "Warm and stylish jacket", image: "https://rab.equipment/media/catalog/product/c/i/cirrus_jacket_army_qip_27_arm.jpg?optimize=medium&fit=bounds&height=&width=", price_in_cents: 7500, quantity: 1, swappable: true, category_id: c3.id, user_id: u3.id)
Product.create!(name: "Garden Tool Set", description: "Complete set for gardening", image: "https://www.leevalley.com/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fblt050573defaf102e3%2Fbltabdd9a3ed5c35e2d%2F669c04e4b74b30248eff89d5%2Fhttps_assets.leevalley.com_Size5_10115_AB634-set-of-9-lee-valley-garden-tools-d-2307.jpg%3Fbranch%3Dproduction&w=3840&q=75", price_in_cents: 3200, quantity: 8, swappable: false, category_id: c4.id, user_id: u4.id)
Product.create!(name: "Building Blocks Set", description: "Creative toy blocks for kids", image: "https://cdn.schoolspecialty.com/122bea52-6dc3-4c9a-ae06-b0f1000241ab/076549_E_JPG%20Output.jpg?width=700&height=700&fit=bounds&canvas=700,700&bg-color=ffffff", price_in_cents: 1800, quantity: 15, swappable: true, category_id: c5.id, user_id: u5.id)

# Chats
Chat.create!(sender_id: u1.id, receiver_id: u2.id, content: "Hi Bob, interested in Camry?")
Chat.create!(sender_id: u2.id, receiver_id: u1.id, content: "Hey Alice, yes it’s available!")
Chat.create!(sender_id: u3.id, receiver_id: u4.id, content: "Dave, is the garden tool set still for sale?")
Chat.create!(sender_id: u4.id, receiver_id: u3.id, content: "Yes Carol, you can pick it up this weekend.")
Chat.create!(sender_id: u5.id, receiver_id: u1.id, content: "Alice, want to swap some toys?")
