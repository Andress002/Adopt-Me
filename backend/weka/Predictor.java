
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

public class Predictor {
    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            System.out.println("Por favor, proporciona la ruta del archivo .arff");
            return;
        }

        String datasetPath = args[0];

        DataSource source = new DataSource(datasetPath);
        Instances data = source.getDataSet();

        if (data.classIndex() == -1) {
            data.setClassIndex(data.numAttributes() - 1);
        }

        J48 tree = new J48();
        tree.buildClassifier(data);

        for (int i = 0; i < data.numInstances(); i++) {
            double pred = tree.classifyInstance(data.instance(i));
            String predClass = data.classAttribute().value((int) pred);
            System.out.println("Instancia " + (i + 1) + " -> Predicción: " + predClass);
        }
    }
}

