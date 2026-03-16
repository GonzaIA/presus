import React, { useState } from 'react';
import { useQuoteStore } from '../../store/useQuoteStore';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Trash2, Edit2, Plus } from 'lucide-react';

export const StepItems: React.FC = () => {
  const { items, addItem, removeItem, updateItem, config } = useQuoteStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ titulo: '', descripcion: '', precio: '' });

  const handleAddItem = () => {
    if (newItem.titulo && newItem.precio) {
      addItem();
      // Actualizar el último item añadido con los datos del formulario
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
      setNewItem({
        titulo: item.titulo,
        descripcion: item.descripcion,
        precio: item.precio.toString()
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const saveEdit = () => {
    if (editingId !== null) {
      updateItem(editingId, {
        titulo: newItem.titulo,
        descripcion: newItem.descripcion,
        precio: parseFloat(newItem.precio) || 0
      });
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
    <div className="space-y-4 pb-12">
      {/* Lista de Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                {item.titulo || 'Sin título'}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditItem(item.id)}
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {item.descripcion && (
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {item.descripcion}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                ${item.precio.toFixed(2)}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Formulario de Nuevo/Editar Item */}
      <Card variant="dashed" className={`${showForm ? 'block' : 'hidden'}`}>
        <h4 className="text-slate-900 dark:text-slate-100 font-semibold mb-4 text-sm uppercase tracking-wider">
          {editingId ? 'Editar Item' : 'Add New Item'}
        </h4>
        <div className="space-y-4">
          <Input
            label="Título del Item"
            placeholder="Ej. Instalación eléctrica"
            value={newItem.titulo}
            onChange={(e) => setNewItem({ ...newItem, titulo: e.target.value })}
          />
          <Input
            label="Descripción"
            placeholder="Describe el trabajo..."
            asTextarea
            rows={2}
            value={newItem.descripcion}
            onChange={(e) => setNewItem({ ...newItem, descripcion: e.target.value })}
          />
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                label="Precio"
                placeholder="0.00"
                type="number"
                step="0.01"
                value={newItem.precio}
                onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={editingId ? saveEdit : handleAddItem}
                className="h-[46px] px-6"
              >
                {editingId ? 'Guardar' : 'Añadir'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Botón Flotante para Añadir */}
      {!showForm && (
        <button 
          onClick={() => { setEditingId(null); setNewItem({ titulo: '', descripcion: '', precio: '' }); setShowForm(true); }}
          className="fixed bottom-24 right-6 size-14 bg-primary text-white rounded-full shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Resumen de Totales */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">IVA ({config.iva}%)</span>
          <span className="font-medium">${iva.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
          <span className="font-bold">Total</span>
          <span className="font-bold text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};