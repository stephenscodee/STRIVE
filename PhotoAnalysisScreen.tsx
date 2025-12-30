import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import {launchImageLibrary, launchCamera, ImagePickerResponse} from 'react-native-image-picker';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';

const PhotoAnalysisScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  const {user} = useAuth();
  const api = useAPI();

  const selectImage = (source: 'camera' | 'gallery') => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 1200,
    };

    const picker = source === 'camera' ? launchCamera : launchImageLibrary;
    
    picker(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Por favor selecciona una foto');
      return;
    }

    if (!height || !weight) {
      Alert.alert('Error', 'Por favor completa altura y peso');
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.type || 'image/jpeg',
        name: selectedImage.fileName || 'body_photo.jpg',
      });
      formData.append('height', parseFloat(height));
      formData.append('weight', parseFloat(weight));
      formData.append('user_id', user?.id);

      const result = await api.upload('/analysis/analyze/', formData);
      setAnalysisResult(result);
      
      Alert.alert(
        'Análisis Completo',
        `Tu porcentaje de grasa estimado es ${(result.body_fat_estimate * 100).toFixed(1)}%`,
      );
    } catch (error: any) {
      Alert.alert('Error', error.detail || 'No se pudo analizar la imagen');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Análisis Corporal</Text>
      <Text style={styles.subtitle}>
        Sube una foto de cuerpo completo y tus métricas
      </Text>

      <View style={styles.imageSection}>
        {selectedImage ? (
          <Image source={{uri: selectedImage.uri}} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Sin imagen</Text>
          </View>
        )}

        <View style={styles.imageButtons}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => selectImage('camera')}>
            <Text style={styles.buttonText}>📷 Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => selectImage('gallery')}>
            <Text style={styles.buttonText}>🖼️ Galería</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="170"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="70"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, isAnalyzing && styles.buttonDisabled]}
          onPress={analyzeImage}
          disabled={isAnalyzing}>
          {isAnalyzing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Analizar Cuerpo</Text>
          )}
        </TouchableOpacity>
      </View>

      {analysisResult && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Resultados del Análisis</Text>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Grasa Corporal:</Text>
            <Text style={styles.resultValue}>
              {(analysisResult.body_fat_estimate * 100).toFixed(1)}%
            </Text>
          </View>
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>IMC:</Text>
            <Text style={styles.resultValue}>
              {analysisResult.bmi.toFixed(1)}
            </Text>
          </View>
          {analysisResult.muscle_mass_estimate && (
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Masa Muscular:</Text>
              <Text style={styles.resultValue}>
                {analysisResult.muscle_mass_estimate.toFixed(1)} kg
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageSection: {
    marginBottom: 30,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  results: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
});

export default PhotoAnalysisScreen;
