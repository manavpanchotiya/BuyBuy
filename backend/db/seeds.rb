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
u6 = User.create!(user_email: "frank@example.com", user_password: "password6", first_name: "Frank", last_name: "Miller", user_location: "Edmonton")
u7 = User.create!(user_email: "grace@example.com", user_password: "password7", first_name: "Grace", last_name: "Wilson", user_location: "Winnipeg")
u8 = User.create!(user_email: "henry@example.com", user_password: "password8", first_name: "Henry", last_name: "Clark", user_location: "Halifax")
u9 = User.create!(user_email: "ivy@example.com", user_password: "password9", first_name: "Ivy", last_name: "Martin", user_location: "Quebec City")
u10 = User.create!(user_email: "jack@example.com", user_password: "password10", first_name: "Jack", last_name: "Wright", user_location: "Regina")

# Categories
c1 = Category.create!(name: "Electronics")
c2 = Category.create!(name: "Automobiles")
c3 = Category.create!(name: "Clothing")
c4 = Category.create!(name: "Home & Garden")
c5 = Category.create!(name: "Toys")

# Products (10 total using just the 5 categories)
Product.create!(name: "Wireless Mouse", description: "Ergonomic wireless mouse", image: "https://webobjects2.cdw.com/is/image/CDW/6842922?$product-main$", price_in_cents: 2500, quantity: 10, swappable: false, category_id: c1.id, user_id: u1.id)
Product.create!(name: "2015 Toyota Camry", description: "A reliable mid-size sedan...", image: "https://mkt-vehicleimages-prd.autotradercdn.ca/photos/chrome/Expanded/White/2015TOY003a/2015TOY003a01.jpg", price_in_cents: 1800000, quantity: 1, swappable: false, category_id: c2.id, user_id: u1.id)
Product.create!(name: "Men's Jacket", description: "Warm and stylish jacket", image: "https://rab.equipment/media/catalog/product/c/i/cirrus_jacket_army_qip_27_arm.jpg?optimize=medium", price_in_cents: 7500, quantity: 1, swappable: true, category_id: c3.id, user_id: u3.id)
Product.create!(name: "Garden Tool Set", description: "Complete set for gardening", image: "https://images.contentstack.io/v3/assets/blt050573defaf102e3/bltabdd9a3ed5c35e2d/669c04e4b74b30248eff89d5/https_assets.leevalley.com.jpg", price_in_cents: 3200, quantity: 8, swappable: false, category_id: c4.id, user_id: u4.id)
Product.create!(name: "Building Blocks Set", description: "Creative toy blocks for kids", image: "https://cdn.schoolspecialty.com/122bea52-6dc3-4c9a-ae06-b0f1000241ab/076549_E_JPG%20Output.jpg", price_in_cents: 1800, quantity: 15, swappable: true, category_id: c5.id, user_id: u5.id)
Product.create!(name: "Bluetooth Speaker", description: "Portable high-quality sound", image: "https://images-na.ssl-images-amazon.com/images/I/71K5Q5RjSCL._AC_SL1500_.jpg", price_in_cents: 6000, quantity: 4, swappable: true, category_id: c1.id, user_id: u6.id)
Product.create!(name: "Used Honda Civic", description: "Reliable city car", image: "https://www.cars.com/i/large/in/v2/stock_photos/e7bd1a9f-6e9e-452d-99c1-cc91d8b51e5d/567f44c4-0bd2-4343-bbb8-6f12fd7a34be.png", price_in_cents: 1550000, quantity: 1, swappable: false, category_id: c2.id, user_id: u7.id)
Product.create!(name: "Women's Winter Coat", description: "Stylish and warm", image: "https://m.media-amazon.com/images/I/81-9oZsXt5L._AC_SL1500_.jpg", price_in_cents: 8500, quantity: 2, swappable: true, category_id: c3.id, user_id: u8.id)
Product.create!(name: "LED Desk Lamp", description: "Energy-efficient lamp for your home office", image: "https://m.media-amazon.com/images/I/61I5Z94HKPL._AC_SL1500_.jpg", price_in_cents: 3000, quantity: 6, swappable: true, category_id: c4.id, user_id: u9.id)
Product.create!(name: "RC Car", description: "Fast and fun remote-controlled car", image: "https://m.media-amazon.com/images/I/71U6tFqWZfL._AC_SL1500_.jpg", price_in_cents: 4200, quantity: 3, swappable: true, category_id: c5.id, user_id: u10.id)

# Chats (10)
Chat.create!(sender_id: u1.id, receiver_id: u2.id, content: "Hi Bob, interested in Camry?")
Chat.create!(sender_id: u2.id, receiver_id: u1.id, content: "Hey Alice, yes it’s available!")
Chat.create!(sender_id: u3.id, receiver_id: u4.id, content: "Dave, is the garden tool set still for sale?")
Chat.create!(sender_id: u4.id, receiver_id: u3.id, content: "Yes Carol, you can pick it up this weekend.")
Chat.create!(sender_id: u5.id, receiver_id: u1.id, content: "Alice, want to swap some toys?")
Chat.create!(sender_id: u6.id, receiver_id: u7.id, content: "Grace, your Civic listing looks nice.")
Chat.create!(sender_id: u7.id, receiver_id: u6.id, content: "Thanks Frank, it's still available.")
Chat.create!(sender_id: u8.id, receiver_id: u9.id, content: "Henry, interested in a coat trade?")
Chat.create!(sender_id: u9.id, receiver_id: u8.id, content: "Sure Ivy, let’s chat!")
Chat.create!(sender_id: u10.id, receiver_id: u5.id, content: "Eve, the RC car looks great!")

