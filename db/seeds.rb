# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Link.delete_all
Page.delete_all
Story.delete_all

story1 = Story.create(title:"hi",category:"yo")
page1 = Page.new(label:"page1",content:"page1 content",question:"page1 question", x: 10,y:10)
page2 = Page.new(label:"page2",content:"page2 content",question:"page2 question",x: 50,y:200)
page3 = Page.new(label:"page3",content:"page3 content",question:"page3 question",x:60,y:300)
page4 = Page.new(label:"page4",content:"page4 content",question:"page4 question",x:10,y:400)
page5 = Page.new(label:"page5",content:"page5 content",question:"page5 question",x:200,y:10)

page1.story = story1
page2.story = story1
page3.story = story1
page4.story = story1
page5.story = story1


page1.save
page2.save
page3.save
page4.save
page5.save

Link.create(choice_index: 0,choice_text:"first link",src_page_id:page1.id,dst_page_id:page2.id)
Link.create(choice_index: 1,choice_text:"second link",src_page_id:page1.id,dst_page_id:page3.id)
