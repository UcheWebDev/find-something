import StudyScene from './StudyScene.vue'
import ParlourScene from './ParlourScene.vue'

// Scene key (see src/data/scenes.js) -> the component that draws it.
export const SCENE_COMPONENTS = {
  room: StudyScene, // the Study (the key stays "room" so saved mysteries keep working)
  parlour: ParlourScene,
}
