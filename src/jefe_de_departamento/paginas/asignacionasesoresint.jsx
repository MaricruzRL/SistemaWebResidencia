const Asignacionasesorint = () => {
    return (
        <div className="contenido">
            <div className="contenido__texto">
                <h1>Asignación de Asesor interno de Residencia Profesional</h1>
            </div>
            <div className="Evalucionreporteresidente__preguntas">
                <div className="contenido__preguntas">
                    <div className="informacion__pregunta">
                    <span>Asesor interno:</span>
                        <input type="text" name="name" placeholder="Asesor Interno"></input>
                        <span>Nombre del proyecto:</span>
                        <input type="text" name="name" placeholder="Nombre del proyecto"></input>
                        <span>Nombre de la empresa:</span>
                        <input type="number" name="numero" min="0" placeholder="N° de control"></input>
                    </div>
                    <div className="informacion__pregunta">
                        <span>Nombre del residente:</span>
                        <input type="text" name="name" placeholder="Nombre del residente"></input>
                        <span>Carrera:</span>
                        <input type="text" name="name" placeholder="Carrera"></input>
                        <span>Periodo de realización de la Residencia <br /> Profesional:</span>
                        <input type="text" name="name" placeholder="Periodo de realización de la Residencia Profesional"></input>
                    </div>
                </div>
            </div>
            <input className="btn-asig" type="submit" name="register" value="Registrar"></input>
            <input className="btn-asig" type="submit" name="register" value="Imprimir"></input>
        </div>
    );
};
export default Asignacionasesorint;