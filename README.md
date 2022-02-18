# Latest Updates

### Description

A small and simple news' CRUD. You can create an infinite number of entries (as long as your localStorage can handle them). You may edit and delete any of them. Each entry has an image, a title, a category and a link.

### Challenges Encountered

I first did it without using context features. A lot of setStates variables all around being passed down for each child component. It worked, but the code was... [kinda messy](https://github.com/fiote/latestupdates-hooks).

Then I started rewriting it using context to store/manage 'models', and suddently I was using just a few function to manage all my data with some points consuming it. I would say the code is way better now.

### Areas of Improvement

Right now I'm storing the base64 data of whatever image you're selecting. This is fine, but it's wasteful. Since the max display size for them is around 350x200 pixels, I could shrink those images (painting them on a small canvas and then getting their new data, for example) before storting them.

### Technologies

React with Typescript.

# See it Working

https://rawcdn.githack.com/fiote/latestupdates-context/master/build/home.html