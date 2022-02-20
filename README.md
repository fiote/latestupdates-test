# Frontend Engineer Test: Latest Updates

Try it out! [https://rawcdn.githack.com/fiote/latestupdates-context/master/build/index.html?t=1](build/index.html)

![Preview](public/promo.png "Preview")

### Description

A small and simple news' CRUD. You can create an infinite number of entries (as long as your localStorage can handle them). You may edit and delete any of them. Each entry has an image, a title, a category and a link.

### Challenges Encountered

2022-02-18

First version done using basic 'useState' hooks. All features implemented, but the code is quite messy since i'm passing down a lot of variables from component to component.

2022-02-18

Moved from using basic hooks to using context to store/manage 'models'. Suddently I was using just a few function to manage all my data with some points consuming it. I would say the code is way better now.

2022-02-19

Moved from using context to using redux, while also organizing files based on features instead of file types. This made the code even cleaner!

2022-02-20

Unit and component tests added using jest.

### Areas of Improvement

Right now I'm storing the base64 data of whatever image you're selecting. This is fine, but it's wasteful. Since the max display size for them is around 350x200 pixels, I could shrink those images (painting them on a small canvas and then getting their new data, for example) before storting them.

### Technologies

React with Typescript.