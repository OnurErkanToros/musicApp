import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TextInput,
  Image,
  Text,
  Modal,
  Button,
} from "react-native";
import React from "react";
import { MusicCard } from "@/components/MusicCard";
import data from "./assets/music-data.json";

type MusicProps = {
  imageUrl: string;
  name: string;
  singerName: string;
  songYear: string;
  isSoldOut: boolean;
};

export default function RootLayout() {
  const [searchInput, setSearchInput] = React.useState("");
  const [musicData, setMusicData] = React.useState(data);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedMusic, setSelectedMusic] = React.useState<MusicProps | null>(
    null
  );

  const openModal = (item: MusicProps) => {
    setSelectedMusic(item);
    setModalVisible(true);
  };
  const closeModal = () => {
    setSelectedMusic(null);
    setModalVisible(false);
  };

  React.useEffect(() => {
    if (searchInput === "") {
      setMusicData(data);
    } else {
      setMusicData(
        data.filter(
          (value) =>
            value.artist.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            value.year.toString().includes(searchInput)
        )
      );
    }
  }, [searchInput]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setSearchInput}
              value={searchInput}
              placeholder="Ara"
            />
          </View>
        }
        data={musicData}
        keyExtractor={(item)=>item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MusicCard
            imageUrl={item.imageUrl}
            name={item.title}
            singerName={item.artist}
            songYear={item.year.toString()}
            isSoldOut={item.isSoldOut}
            onPress={() =>
              openModal({
                imageUrl: item.imageUrl,
                name: item.title,
                singerName: item.artist,
                songYear: item.year.toString(),
                isSoldOut: !item.isSoldOut,
              })
            }
          ></MusicCard>
        )}
      />
      {selectedMusic && (
        <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedMusic && (
              <>
                <Image
                  source={{ uri: selectedMusic.imageUrl }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedMusic.name}</Text>
                <Text style={styles.modalArtist}>{selectedMusic.singerName}</Text>
                <Text style={styles.modalYear}>{selectedMusic.songYear}</Text>
                {!selectedMusic.isSoldOut && <Text style={styles.modalSold}>Tükendi</Text>}
              </>
            )}
            <Button title="Kapat" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalImage: { width: 250 , height: 250, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  modalArtist: { fontSize: 16, marginBottom: 5 },
  modalYear: { fontSize: 14, marginBottom: 5 },
  modalSold: { color: "red", fontWeight: "bold", marginBottom: 10 },
});
