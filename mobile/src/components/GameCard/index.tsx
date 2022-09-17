import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

interface DataProps extends TouchableOpacityProps {
  data: GameCardProps
}

export function GameCard({ data, ...rest }: DataProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >

        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>

      </ImageBackground>

    </TouchableOpacity>
  );
}