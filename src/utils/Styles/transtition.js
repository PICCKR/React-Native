import {Transition} from 'react-native-reanimated'
export const dropDownTranstion = (
    <Transition.Together>
        <Transition.In type="fade" durationMs={300}/>
        <Transition.Change />
        <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
)