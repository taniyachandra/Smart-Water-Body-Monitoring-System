import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { api } from "../services/api";
import { resetWaterBodiesCache } from "../services/useWaterBodies";

const EMPTY = {
  name: "",
  type: "River",
  state: "",
  quality: "Good",
  latitude: "",
  longitude: "",
  pH: "",
  temperature: "",
  turbidity: "",
  dissolvedOxygen: "",
  tds: "",
};

const NUMBER_FIELDS = [
  ["latitude", "Latitude"],
  ["longitude", "Longitude"],
  ["pH", "pH"],
  ["temperature", "Temperature (°C)"],
  ["turbidity", "Turbidity (NTU)"],
  ["dissolvedOxygen", "Dissolved oxygen (mg/L)"],
  ["tds", "TDS (mg/L)"],
];

function AdminWaterBodies({ token }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null); // null = form hidden
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/water-bodies")
      .then(setList)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const reload = async () => setList(await api("/water-bodies"));

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY);
  };

  const openEdit = (waterBody) => {
    setEditingId(waterBody.id);
    const values = {};
    Object.keys(EMPTY).forEach((key) => (values[key] = waterBody[key]));
    setForm(values);
  };

  const closeForm = () => {
    setForm(null);
    setEditingId(null);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const path = editingId
        ? `/admin/water-bodies/${editingId}`
        : "/admin/water-bodies";

      await api(path, {
        method: editingId ? "PUT" : "POST",
        body: form,
        token,
      });

      resetWaterBodiesCache();
      await reload();
      toast.success(editingId ? "Water body updated" : "Water body added");
      closeForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (waterBody) => {
    if (!window.confirm(`Delete "${waterBody.name}"? This cannot be undone.`)) {
      return;
    }

    try {
      await api(`/admin/water-bodies/${waterBody.id}`, {
        method: "DELETE",
        token,
      });
      resetWaterBodiesCache();
      await reload();
      toast.success("Water body deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading water bodies...</p>;

  return (
    <section>
      <div className="aw-top">
        <span className="aw-count">{list.length} water bodies</span>
        {!form && (
          <button className="aw-add" onClick={openAdd}>
            + Add water body
          </button>
        )}
      </div>

      {form && (
        <form className="aw-form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit water body" : "Add new water body"}</h3>

          <div className="aw-grid">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label>
              State
              <input name="state" value={form.state} onChange={handleChange} required />
            </label>

            <label>
              Type
              <select name="type" value={form.type} onChange={handleChange}>
                <option>River</option>
                <option>Lake</option>
                <option>Reservoir</option>
              </select>
            </label>

            <label>
              Quality
              <select name="quality" value={form.quality} onChange={handleChange}>
                <option>Good</option>
                <option>Moderate</option>
                <option>Poor</option>
              </select>
            </label>

            {NUMBER_FIELDS.map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  type="number"
                  step="any"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  required
                />
              </label>
            ))}
          </div>

          <div className="aw-actions">
            <button type="submit" className="aw-save" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Save changes" : "Add water body"}
            </button>
            <button type="button" className="aw-cancel" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="aw-list">
        {list.map((wb) => (
          <div className="aw-row" key={wb.id}>
            <div>
              <strong>{wb.name}</strong>
              <span>
                {wb.type} · {wb.state}
              </span>
            </div>

            <span className={`quality-pill quality-${wb.quality.toLowerCase()}`}>
              {wb.quality}
            </span>

            <div className="aw-row-actions">
              <button onClick={() => openEdit(wb)}>Edit</button>
              <button className="aw-delete" onClick={() => handleDelete(wb)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminWaterBodies;