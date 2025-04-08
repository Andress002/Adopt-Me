import weka.classifiers.Classifier;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;
import weka.core.SerializationHelper;

public class Predictor {
    public static void main(String[] args) throws Exception {
        if (args.length != 2) {
            System.out.println("Uso: java Predictor <modelo.model> <archivo.arff>");
            return;
        }

        String modelPath = args[0];
        String datasetPath = args[1];

        Classifier model = (Classifier) SerializationHelper.read(modelPath);

        DataSource source = new DataSource(datasetPath);
        Instances data = source.getDataSet();

        if (data.classIndex() == -1) {
            data.setClassIndex(data.numAttributes() - 1);
        }

        for (int i = 0; i < data.numInstances(); i++) {
            double pred = model.classifyInstance(data.instance(i));
            String predClass = data.classAttribute().value((int) pred);
            System.out.println("Instancia " + (i + 1) + " -> Predicción: " + predClass);
        }
    }
}
