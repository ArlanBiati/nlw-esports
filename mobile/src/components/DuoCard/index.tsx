import { View } from 'react-native';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  name: string;
  useVoiceChannel: boolean,
  weekDays: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

interface Props {
  data: DuoCardProps
}

export function DuoCard({ data }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />

      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />

      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias`}
      />

      <DuoInfo
        label='Chamada de áudio?'
        value={`${data.yearsPlaying}`}
      />
    </View>
  );
}