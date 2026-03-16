import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const StepItems: React.FC = () => {
  const { items, addItem, removeItem, updateItem, config } = useQuoteStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', precio: '' });

  const handleAddItem = () => {
    if (newItem.titulo && newItem.precio) {
      addItem();
      const lastItem = items[items.length - 1];
      updateItem(lastItem.id, {
        titulo: newItem.titulo,
        descripcion: newItem.descripcion,
        precio: parseFloat(newItem.precio) || 0
      });
      setNewItem({ titulo: '', descripcion: '', precio: '' });
      setShowForm(false);
    }
  };

  const handleEditItem = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setNewItem({ titulo: item.titulo, descripcion: item.descripcion, precio: item.precio.toString() });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const saveEdit = () => {
    if (editingId !== null) {
      updateItem(editingId, { titulo: newItem.titulo, descripcion: newItem.descripcion, precio: parseFloat(newItem.precio) || 0 });
      setEditingId(null);
      setNewItem({ titulo: '', descripcion: '', precio: '' });
      setShowForm(false);
    }
  };

  const calcularTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.precio, 0);
    const iva = subtotal * (config.iva / 100);
    return { subtotal, iva, total: subtotal + iva };
  };

  const { subtotal, iva, total } = calcularTotal();

  return (
    <div className="space-y-6">
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 && !showForm && (
            <Card className="text-center py-12">
              <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">inventory_2</span>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Sin items</h3>
              <p className="text-slate-500 text-sm mb-4">Añade los servicios o productos de tu presupuesto</p>
              <Button onClick={() => setShowForm(true)}>Añadir Item</Button>
            </Card>
          )}

          {items.map(item => (
            <Card key={item.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">receipt</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.titulo || 'Sin título'}</h4>
                    {item.descripcion && <p className="text-sm text-slate-500">{item.descripcion}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEditItem(item.id)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-primary">${item.precio.toFixed(2)}</span>
              </div>
            </Card>
          ))}

          {/* Add/Edit Form */}
          {showForm && (
            <Card>
              <h4 className="font-semibold text-slate-900 mb-4">{editingId ? 'Editar Item' : 'Nuevo Item'}</h4>
              <div className="space-y-4">
                <Input label="Título" placeholder="Ej. Servicio de pintura" value={newItem.titulo} onChange={e => setNewItem({...newItem, titulo: e.target.value})} />
                <Input label="Descripción" asTextarea placeholder="Detalles del servicio..." value={newItem.descripcion} onChange={e => setNewItem({...newItem, descripcion: e.target.value})} />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input label="Precio" type="number" placeholder="0.00" value={newItem.precio} onChange={e => setNewItem({...newItem, precio: e.target.value})} />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" onClick={() => { setShowForm(false); setEditingId(null); setNewItem({ titulo: '', descripcion: '', precio: '' }); }}>Cancelar</Button>
                    <Button onClick={editingId ? saveEdit : handleAddItem}>{editingId ? 'Guardar' : 'Añadir'}</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Add Button */}
          {!showForm && items.length > 0 && (
            <button onClick={() => { setEditingId(null); setNewItem({ titulo: '', descripcion: '', precio: '' }); setShowForm(true); }} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Añadir Item
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-6">
            <h4 className="font-semibold text-slate-900 mb-4">Resumen</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">IVA ({config.iva}%)</span>
                <span className="font-medium">${iva.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
