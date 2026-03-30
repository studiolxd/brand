import type { Meta, StoryObj } from '@storybook/react-vite';
import { Legal } from './Legal';

const meta: Meta<typeof Legal> = {
  title: 'Templates/Legal',
  component: Legal,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Legal>;

export const Default: Story = {
  args: {
    title: 'Aviso legal',
    sections: [
      {
        title: 'Identificación del titular',
        content: (
          <>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
              Sociedad de la Información y de Comercio Electrónico (LSSICE), se informa de los
              siguientes datos identificativos:
            </p>
            <ul>
              <li>
                <strong>Denominación social:</strong> Studio LXD, S.L.
              </li>
              <li>
                <strong>CIF:</strong> B-XXXXXXXX
              </li>
              <li>
                <strong>Domicilio social:</strong> Calle Ejemplo, 00, 41001 Sevilla
              </li>
              <li>
                <strong>Correo electrónico:</strong> hello@studiolxd.com
              </li>
              <li>
                <strong>Teléfono:</strong> +34 623 752 862
              </li>
              <li>
                <strong>Registro Mercantil:</strong> Inscrita en el Registro Mercantil de Sevilla,
                Tomo X, Folio X, Hoja SE-XXXXX.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'Objeto',
        content: (
          <>
            <p>
              El presente Aviso Legal regula el acceso y uso del sitio web{' '}
              <strong>studiolxd.com</strong> (en adelante, «el Sitio»), titularidad de Studio LXD,
              S.L.
            </p>
            <p>
              El acceso al Sitio implica la aceptación plena y sin reservas de las presentes
              condiciones. Studio LXD se reserva el derecho a modificar este Aviso Legal en
              cualquier momento, siendo responsabilidad del usuario revisarlo periódicamente.
            </p>
          </>
        ),
      },
      {
        title: 'Condiciones de uso',
        content: (
          <>
            <p>
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios del
              Sitio, y en particular a no emplearlos para:
            </p>
            <ul>
              <li>
                Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden
                público.
              </li>
              <li>
                Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que
                atenten contra los derechos humanos.
              </li>
              <li>
                Introducir o difundir en la red virus informáticos o cualesquiera otros sistemas
                físicos o lógicos que sean susceptibles de provocar daños.
              </li>
              <li>
                Intentar acceder, utilizar o manipular los datos de terceros, otros usuarios o el
                propio sistema de Studio LXD.
              </li>
            </ul>
            <p>
              Studio LXD se reserva el derecho a retirar el acceso al Sitio, sin previo aviso, a
              cualquier usuario que incumpla las presentes condiciones.
            </p>
          </>
        ),
      },
      {
        title: 'Propiedad intelectual e industrial',
        content: (
          <>
            <p>
              Todos los contenidos del Sitio —incluyendo, sin carácter limitativo, textos,
              fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás
              contenidos audiovisuales o sonoros— son propiedad de Studio LXD o de terceros que han
              autorizado su uso, y están protegidos por derechos de propiedad intelectual e
              industrial.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, comunicación pública y transformación
              total o parcial de los contenidos del Sitio sin la autorización expresa y por escrito
              de Studio LXD. El usuario podrá visualizar y descargar los materiales únicamente para
              su uso personal y no comercial.
            </p>
            <p>
              Las marcas, nombres comerciales o signos distintivos publicados en el Sitio son
              titularidad de Studio LXD o de terceros. No se concede ninguna licencia o derecho de
              uso sobre ellos salvo autorización expresa.
            </p>
          </>
        ),
      },
      {
        title: 'Limitación de responsabilidad',
        content: (
          <>
            <p>
              Studio LXD no garantiza la disponibilidad continua e ininterrumpida del Sitio ni la
              ausencia de errores en sus contenidos. En la medida en que lo permita la normativa
              aplicable, Studio LXD queda exonerada de cualquier responsabilidad derivada de:
            </p>
            <ul>
              <li>
                Interrupciones, errores o fallos en el acceso al Sitio por causas ajenas a su
                control.
              </li>
              <li>
                Virus u otros elementos lesivos introducidos por terceros a través del Sitio.
              </li>
              <li>El uso inadecuado del Sitio por parte del usuario.</li>
              <li>Los contenidos de sitios web de terceros enlazados desde el Sitio.</li>
            </ul>
            <p>
              Los enlaces a sitios externos se ofrecen exclusivamente como información. Studio LXD
              no controla ni se responsabiliza del contenido de dichos sitios ni de las prácticas
              de privacidad de sus titulares.
            </p>
          </>
        ),
      },
      {
        title: 'Protección de datos',
        content: (
          <>
            <p>
              El tratamiento de los datos personales recabados a través del Sitio se rige por la
              Política de Privacidad de Studio LXD, accesible desde el pie de página del Sitio.
            </p>
            <p>
              Studio LXD actúa en cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo
              y del Consejo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de
              Datos Personales y garantía de los derechos digitales (LOPDGDD).
            </p>
          </>
        ),
      },
      {
        title: 'Legislación aplicable y jurisdicción',
        content: (
          <p>
            El presente Aviso Legal se rige en su totalidad por la legislación española. Para la
            resolución de cualquier controversia derivada del acceso o uso del Sitio, las partes se
            someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los
            Juzgados y Tribunales de la ciudad de Sevilla.
          </p>
        ),
      },
    ],
  },
};
