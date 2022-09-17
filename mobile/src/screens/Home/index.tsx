import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Header } from '../../components/Header';

import { styles } from './styles';

interface NavigationProps {
  navigate: (
    screen: string,
    gameObject: {
      id: string;
      title: string;
      bannerUrl: string;
      }
  ) => void
}

export function Home() {
  const navigation = useNavigation<NavigationProps>();

  const [games, setGames] = useState<GameCardProps[]>([]);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://localhost:3333/games')
    .then(res => res.json())
    .then(data => {
      setGames(data)
    })
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <Header
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={ () => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
    </Background>
  );
}