import {Button} from 'common/Button';
import {Input} from 'common/Input';
import {Label} from 'common/Label';
import React, {useState} from 'react';
import {View, Alert} from 'react-native';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const FeedbackForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (fieldName: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append('name', formData.name);
    formdata.append('email', formData.email);
    formdata.append('message', formData.message);
    formdata.append(
      'date',
      new Date().toDateString() + ' ' + new Date().toTimeString(),
    );

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://www.yakupdurmus.com/project/electric-station/feedback.php',
      requestOptions,
    )
      .then(() => {
        Alert.alert('Geri bildirim başarıyla alındı!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch(() => {
        Alert.alert('Bir hata oluştu.');
      });
  };

  return (
    <View style={styles.container}>
      <Label style={styles.label}>Ad Soyad</Label>
      <Input
        value={formData.name}
        onChangeText={value => handleInputChange('name', value)}
      />

      <Label style={styles.label}>Mail Adresi</Label>
      <Input
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
        keyboardType="email-address"
      />

      <Label style={styles.label}>Mesajınız</Label>
      <Input
        value={formData.message}
        onChangeText={value => handleInputChange('message', value)}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button buttonType="blue" label="Gönder" onPress={handleSubmit} />
    </View>
  );
};

const styles = {
  container: {padding: 16},
  label: {marginBottom: 4, marginTop: 8},
  input: {marginBottom: 16, height: 100},
};

export default FeedbackForm;
