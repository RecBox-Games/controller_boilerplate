# Controller Boilerplate

app.js is provided as an example and should be replaced by the game developer

The game developer's app.js should implement the following functions

- handleMessage(message)
- outgoingMessages() -> string[]
- drawables() -> drawable
  - where drawable has {type={'image','circle','rect','line'}, (x,y), [(scalex, scaley)], (radius), (rotation), (color)}
- handleTouchStart(id, x, y)
- handleTouchMove(id, x, y)
- handleTouchEnd(id, x, y)
- handleTouchCancel(id, x, y)
- start()
  - called any time the page is reloaded // TODO: is that useful? name differently? only call once?
- update()
  - called 30 times per second
