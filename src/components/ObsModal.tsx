"use client";
import { useEffect, useState } from "react";
import styles from "@/app/(privada)/privateLayout.module.css";
import { FaUser } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dados: any) => Promise<boolean>;
  initialData?: any;
};

export default function ObsModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState({
    observacao: "",
  });

  // Preenche formulário se for edição
  useEffect(() => {
    if (initialData?.obs) {
      setForm({
        observacao: initialData.obs,
      });
    } else {
      setForm({ observacao: "" });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const dados = {
      id: initialData?.id,
      escalaId: initialData?.id, // passa o id da escala como referência
      obs: form.observacao,
    };

    const sucesso = await onSubmit(dados);

    if (sucesso) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlayDist} onClick={onClose}>
      <div className={styles.distModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalRightDist}>
          <h3 style={{ fontSize: "15px", paddingBottom: "10px" }}>
            <strong>Observação da Escala</strong>
          </h3>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ padding: "12px" }}>
              <FaUser style={{ width: "30px", height: "30px" }} />
            </div>

            <div style={{ textAlign: "left", fontSize: "13px" }}>
              <span style={{ fontWeight: "bold" }}>
                {initialData?.userObs?.pg} {initialData?.userObs?.nomeGuerra}{" "}
                {initialData?.userObs?.ome?.nomeOme ?? "(OME não informada)"}
              </span>

              <br />
              <span style={{ color: "#838282" }}>
                Última atualização:{" "}
                {new Date(initialData.updatedObsAt).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <textarea
              name="observacao"
              className={styles.input}
              rows={2}
              placeholder="Digite a observação..."
              value={form.observacao}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className={styles.closeModal}
              onClick={handleSubmit}
              style={{ width: "100px", backgroundColor: "#118a2f" }}
            >
              Salvar
            </button>
            <button
              onClick={onClose}
              className={styles.closeModal}
              style={{
                width: "100px",
                marginLeft: "10px",
                backgroundColor: "#888",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
