// Every inspectable object, by id. `name` is also the accessible label on the artwork.
const o = (name, desc, icon) => ({ name, desc, icon })

export const OB = {
  // ---- Study ----
  books: o('Bookshelf', 'Five colourful books (red, green, blue, gold and purple) stand on the top shelf. Lower down are older, worn books and a few ornaments.', '📚'),
  painting: o('Landscape painting', 'A hillside landscape in a heavy dark frame, with green hills and a bright yellow sun.', '🖼️'),
  clock: o('Wall clock', 'A round clock with a brass rim and a cream face. Its hands rest at ten past ten.', '🕰️'),
  drawer: o('Desk drawer', 'The top drawer of the desk, with a small brass handle in the middle.', '🗄️'),
  journal: o('Journal', 'A red leather journal with a gold line down its middle, lying on the desk.', '📕'),
  lamp: o('Desk lamp', 'A curved brass desk lamp with a wide golden shade.', '💡'),
  window: o('Window', 'A tall window onto the night. A pale moon hangs in the sky, and heavy red curtains are drawn back on both sides.', '🌙'),
  mirror: o('Mirror', 'An oval mirror in a dark wooden frame, hung on the wall between the painting and the clock.', '🪞'),
  globe: o('Globe', 'A globe on a small floor stand, with green continents and blue oceans.', '🌍'),
  plant: o('Potted plant', 'A leafy green plant in a round terracotta pot on the floor.', '🪴'),
  rug: o('Rug', 'A deep red oval rug with a dashed golden border, lying in the middle of the floor.', '🟥'),
  candle: o('Candle', 'A tall cream candle in a short brass holder on the side table, with a small flame burning.', '🕯️'),
  chair: o('Chair', 'A wooden chair with a tall back, pulled up beside the desk and facing the side table.', '🪑'),
  teacup: o('Teacup', 'A cream porcelain teacup on a saucer, with a thin curl of steam rising from it.', '☕'),
  trophy: o('Trophy', 'A small golden trophy cup with two curved handles, sitting on top of the bookshelf.', '🏆'),
  suitcase: o('Suitcase', 'A brown leather suitcase with brass clasps and a stiff handle, standing on the floor in front of the desk.', '🧳'),
  cat: o('Cat', 'A sleeping grey cat curled up on the rug, with its tail wrapped around its body.', '🐈'),

  // ---- Parlour ----
  p_tv: o('TV', 'A big flat TV on a low stand. The screen shows a green hill and a yellow sun under a blue sky.', '📺'),
  p_sofa: o('Sofa', 'A deep red three-seat sofa with rounded arms and a tall back.', '🛋️'),
  p_table: o('Coffee table', 'A low wooden coffee table at the front of the parlour.', '🟫'),
  p_fire: o('Fireplace', 'A brick fireplace with a wide mantelpiece and a small fire burning.', '🔥'),
  p_lamp: o('Floor lamp', 'A tall floor lamp with a cream shade, standing between the TV and the sofa.', '🏮'),
  p_photo: o('Family photo', 'A framed photo of two smiling people, hung above the fireplace.', '📷'),
  p_vase: o('Vase', 'A small blue vase of pink, yellow and purple flowers on the coffee table.', '💐'),
  p_window: o('Parlour window', 'A tall window with deep green curtains drawn back, looking out on a dark blue evening sky with a few stars.', '🪟'),
  p_clock: o('Parlour clock', 'A round wall clock with a thin black frame and a white face. Its hands show three o\'clock.', '⏰'),
  p_shelf: o('Wall shelf', 'A narrow wooden shelf above the TV, holding a small model ship, a little green plant and three books.', '⛵'),
  p_cushion: o('Cushion', 'A square gold cushion with a red stitched border, propped against the back of the sofa at the right-hand end.', '🟨'),
  p_teapot: o('Teapot', 'A round cream teapot with a gold lid and a blue stripe, on the coffee table beside the vase.', '🫖'),
  p_rug: o('Parlour rug', 'A big teal oval rug with a dashed golden border, in the middle of the parlour floor.', '🟦'),
  p_dog: o('Dog', 'A brown dog fast asleep on the rug, with its nose tucked down by its paws.', '🐕'),
  p_armchair: o('Armchair', 'A squashy mustard-yellow armchair with wide arms, standing in the right-hand corner of the room.', '💺'),
  p_plant: o('Tall plant', 'A tall leafy plant in a white pot, standing in the corner beside the fireplace.', '🌿'),
}

/*
 * Scenes. `key` is what gets saved with a mystery in the database, so keep existing keys stable
 * (the Study is still stored as "room").
 *
 * To add a scene later:
 *   1. add its objects to OB above,
 *   2. add an entry here with the object ids in `items`,
 *   3. create src/scenes/XScene.vue (copy ParlourScene.vue) and register it in src/scenes/index.js.
 */
export const SCENES = {
  room: {
    name: 'Study',
    emoji: '📚',
    label: 'Study with 17 objects to inspect, including a bookshelf, painting, clock, desk, globe, chair, teacup, trophy, suitcase and cat',
    items: ['books', 'painting', 'clock', 'drawer', 'journal', 'lamp', 'window', 'mirror', 'globe', 'plant', 'rug', 'candle', 'chair', 'teacup', 'trophy', 'suitcase', 'cat'],
  },
  parlour: {
    name: 'Parlour',
    emoji: '📺',
    label: 'Parlour with 16 objects to inspect, including a TV, sofa, fireplace, coffee table, armchair, window, shelf, dog and plant',
    items: ['p_tv', 'p_sofa', 'p_table', 'p_fire', 'p_lamp', 'p_photo', 'p_vase', 'p_window', 'p_clock', 'p_shelf', 'p_cushion', 'p_teapot', 'p_rug', 'p_dog', 'p_armchair', 'p_plant'],
  },
}

// Older mysteries may point at a scene that no longer exists (garden, street): fall back to the Study.
export const sceneOrDefault = (k) => (SCENES[k] ? k : 'room')

// Older mysteries may also point at an object that was removed (the safe, garden and street items).
export const objectOf = (id) => OB[id] || o('mystery object', '', '❔')
