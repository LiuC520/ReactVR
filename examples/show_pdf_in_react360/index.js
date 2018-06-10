import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  texture,
  Plane,
  NativeModules
} from 'react-360';

const PDF = NativeModules.PdfModule;
export default class show_pdf_in_react360 extends React.Component {
  componentWillMount(){
    PDF.showPdf('http://localhost:8081/output.pdf',512,1024,2)
  }

  render() {
    return (
      <View style={styles.panel}>
        <Plane
        dimWidth={512}
        dimHeight={512}
        dimDepth={100}
        texture={texture('fps')} // Use our custom texture
      />
        <View style={styles.greetingBox}>
          <VrButton onClick={()=>{
            PDF.showPage('next') // show next page
            // PDF.showPage('last') // show last page
          }}>
            <Text style={styles.text}>
              enter
            </Text>

          </VrButton>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('show_pdf_in_react360', () => show_pdf_in_react360);
