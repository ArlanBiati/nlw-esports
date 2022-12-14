import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import { THEME } from '../../theme';
import { styles } from './styles';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;

  const navitation = useNavigation();

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  function handleGoBack() {
    navitation.goBack();
  }

  async function getDiscordUser(adsIS: string) {
    await fetch(`http://localhost:3333/ads/${adsIS}/discord`)
    .then(res => res.json())
    .then(data => {
      setDiscordDuoSelected(data.discord)
    })
  }

  useEffect(() => {
    fetch(`http://localhost:3333/games/${game.id}/ads`)
    .then(res => res.json())
    .then(data => {
      setDuos(data);
    })
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >

          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode='cover'
          />

          <Header
            title={game.title}
            subtitle='Conecte-se e comece a jogar!'
          />

          <FlatList
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => getDiscordUser(item.id)}
              />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                N??o h?? an??ncios publicados para esse game.
              </Text>
            )}
          />
        </ScrollView>

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}